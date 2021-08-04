function runPostman() {

  var discordUrl = "https://discord.com/api/webhooks/***";

  /// we get total num of sheets and then set the last sheet as active sheet.
  var logbook = SpreadsheetApp.openById('your key here');
  var totalSheets = logbook.getNumSheets();
  var lastSheet = logbook.getSheets()[totalSheets-1];
  var currentSheet = SpreadsheetApp.setActiveSheet(lastSheet);
  var activeSheet = SpreadsheetApp.getActiveSheet();
  //console.log(activeSheet.getSheetName());

  //getting tt values in variable called vals
  var vals = activeSheet.getRange(3,1,9,7).getValues();
  var day = vals[0][0].replace("DAY", "").replaceAll(":", "").trim(" ", "");
  var date = vals[0][6].replace("DATE", "").replaceAll(":", "").trim(" ", "");

  var payload = [];
  
  var data = "";
  data += "**------------------------------------------------------------------------**\n\n";

  for (var i = 1; i <= 6; i = i + 1) {
    var period = {};
    
    data += "**Time: **"+ "  " + vals[2][i].toString().replaceAll("\n"," ") + "\n"
    data += "**Teacher: **"+ "  " +  vals[3][i].toString().trim() + "\n"
    data += "**Subject: **"+ "  " +  vals[4][i].toString().trim() + "\n"
    data += "**Topic: **"+ "  " +  vals[5][i].toString().trim() + "\n"
    data += "**Meeting ID: **"+ "  " +  vals[6][i].toString().trim() + "\n"
    data += "**Zoom Link: **"+ "  " +  "<" + vals[7][i].toString().trim() + ">" + "\n"
    data += "**Password: **"+ "  " +  (isNaN(vals[8][i].toString().trim()) ? "None" : vals[8][i].toString().trim()) + "\n";
    data += "\n**------------------------------------------------------------------------**\n\n";
  }

  var payload = JSON.stringify({
    "embeds": [{
      "title": date + " - " + day,
      "color": 15105570,
      "description": data,
    }] 
  });

  var params = {
    method: "POST",
    payload: payload,
    muteHttpExceptions : true,
    contentType: "application/json",
  };

  var response = UrlFetchApp.fetch(discordUrl, params);

  response.getHeaders();
  Logger.log(response.getResponseCode());
  Logger.log(response.getContentText());
}
