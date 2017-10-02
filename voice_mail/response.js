const dialXml = `
<Response>
<Dial>
    <Client>$client</Client>
</Dial>
<Say>
    $clientName can&apos;t come to the phone right now. Please leave a message after the beep.
</Say>
<Record action="/sendEmail?client=$client" method="GET" maxLength="20" playBeep="true"/>
</Response>
`

const setupErrorXml = `
<Response>
<Say>Please check the instructions to setup this app</Say>
</Response>
`

const emailXml = `
<Response>
<Email to="$toAddress" from="restcomm@restcomm.com" subject="You have a new voice mail!">
You have a new voice mail from $core_callerName! You can listen to it at $core_RecordingUrl.
</Email>
</Response>
`

const hangupXml = `
<Response>
<Hangup />
</Response>
`


function xmlEscape(input) {
  return input.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function dial(client, clientName) {
  return dialXml
    .replace(/\$client([^N])/g, xmlEscape(client) + "$1")
    .replace(/\$clientName/g, xmlEscape(clientName));
}

function setupError() {
  return setupErrorXml;
}

function sendEmail(toAddress, fromUser, recordingUrl) {
  return emailXml
    .replace(/\$toAddress/g, xmlEscape(toAddress))
    .replace(/\$core_callerName/g, xmlEscape(fromUser))
    .replace(/\$core_RecordingUrl/g, xmlEscape(recordingUrl));
}

function hangup() {
  return hangupXml;
}

module.exports = {
  dial,
  setupError,
  sendEmail,
  hangup
}
