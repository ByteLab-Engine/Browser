!macro customInstall
  WriteRegStr SHCTX "SOFTWARE\RegisteredApplications" "ByteLab" "Software\Clients\StartMenuInternet\ByteLab\Capabilities"

  WriteRegStr SHCTX "SOFTWARE\Classes\ByteLab" "" "ByteLab HTML Document"
  WriteRegStr SHCTX "SOFTWARE\Classes\ByteLab\Application" "AppUserModelId" "ByteLab"
  WriteRegStr SHCTX "SOFTWARE\Classes\ByteLab\Application" "ApplicationIcon" "$INSTDIR\ByteLab.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\ByteLab\Application" "ApplicationName" "ByteLab"
  WriteRegStr SHCTX "SOFTWARE\Classes\ByteLab\Application" "ApplicationCompany" "ByteLab"
  WriteRegStr SHCTX "SOFTWARE\Classes\ByteLab\Application" "ApplicationDescription" "Web Browser."
  WriteRegStr SHCTX "SOFTWARE\Classes\ByteLab\DefaultIcon" "DefaultIcon" "$INSTDIR\ByteLab.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\ByteLab\shell\open\command" "" '"$INSTDIR\ByteLab.exe" "%1"'

  WriteRegStr SHCTX "SOFTWARE\Classes\.htm\OpenWithProgIds" "ByteLab" ""
  WriteRegStr SHCTX "SOFTWARE\Classes\.html\OpenWithProgIds" "ByteLab" ""

  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\ByteLab" "" "ByteLab"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\ByteLab\DefaultIcon" "" "$INSTDIR\ByteLab.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\ByteLab\Capabilities" "ApplicationDescription" "Extensible, fast and innovative web browser with Innatical UI."
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\ByteLab\Capabilities" "ApplicationName" "ByteLab"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\ByteLab\Capabilities" "ApplicationIcon" "$INSTDIR\ByteLab.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\ByteLab\Capabilities\FileAssociations" ".htm" "ByteLab"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\ByteLab\Capabilities\FileAssociations" ".html" "ByteLab"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\ByteLab\Capabilities\URLAssociations" "http" "ByteLab"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\ByteLab\Capabilities\URLAssociations" "https" "ByteLab"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\ByteLab\Capabilities\StartMenu" "StartMenuInternet" "ByteLab"
  
  WriteRegDWORD SHCTX "SOFTWARE\Clients\StartMenuInternet\ByteLab\InstallInfo" "IconsVisible" 1
  
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\ByteLab\shell\open\command" "" "$INSTDIR\ByteLab.exe"
!macroend
!macro customUnInstall
  DeleteRegKey SHCTX "SOFTWARE\Classes\ByteLab"
  DeleteRegKey SHCTX "SOFTWARE\Clients\StartMenuInternet\ByteLab"
  DeleteRegValue SHCTX "SOFTWARE\RegisteredApplications" "ByteLab"
!macroend