# Baixa a planilha de textos e salva a cópia offline em conteudo/textos-planilha.js.
# Rodado pelo atalho "ATUALIZAR TEXTOS.bat" (precisa de internet só neste momento).
$ErrorActionPreference = 'Stop'
$raiz = Split-Path -Parent $PSScriptRoot
$roteiro = [IO.File]::ReadAllText((Join-Path $raiz 'conteudo\roteiro.js'), [Text.Encoding]::UTF8)
$m = [regex]::Match($roteiro, 'planilhaTextos:\s*"([^"]*)"')
if (-not $m.Success -or -not $m.Groups[1].Value) {
  Write-Host 'Nenhuma planilha configurada (config.planilhaTextos no roteiro).' -ForegroundColor Yellow
  exit 1
}
$link = $m.Groups[1].Value
$id = [regex]::Match($link, '/spreadsheets/d/([\w-]+)').Groups[1].Value
$url = if ($id) { "https://docs.google.com/spreadsheets/d/$id/gviz/tq?tqx=out:csv&headers=0&sheet=Textos" } else { $link }

Write-Host 'Baixando os textos da planilha...'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$cliente = New-Object Net.WebClient
$cliente.Encoding = [Text.Encoding]::UTF8
$csv = $cliente.DownloadString($url + $(if ($url.Contains('?')) { '&' } else { '?' }) + '_=' + [DateTimeOffset]::Now.ToUnixTimeSeconds())
if ($csv -notmatch 'TEXTO NOVO') {
  Write-Host 'A planilha não respondeu como esperado (confira se o acesso está como "Qualquer pessoa com o link").' -ForegroundColor Red
  exit 1
}

# escapa para string JavaScript
$js = $csv.Replace('\', '\\').Replace('"', '\"').Replace("`r", '').Replace("`n", '\n')
$agora = Get-Date -Format 'dd/MM/yyyy HH:mm'
$conteudo = "/* Cópia dos textos da planilha (gerada por `"ATUALIZAR TEXTOS.bat`" em $agora). */`nwindow.TEXTOS_PLANILHA = { baixadoEm: `"$agora`", csv: `"$js`" };`n"
[IO.File]::WriteAllText((Join-Path $raiz 'conteudo\textos-planilha.js'), $conteudo, (New-Object Text.UTF8Encoding $false))

Write-Host "Pronto: textos salvos para uso offline ($agora)." -ForegroundColor Green
