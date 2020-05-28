{{ $DEPLOYMENTINFO_USERREGION := .Env.DEPLOYMENTINFO_USERREGION | default "" -}}
{{ $BRIDGE_CHANNEL := .Env.BRIDGE_CHANNEL | default "datachannel" -}}
{{ $ENABLE_BRIDGE_CHANNEL := .Env.ENABLE_BRIDGE_CHANNEL | default "true" | toBool -}}
{{ $ENABLE_CALENDAR := .Env.ENABLE_CALENDAR | default "false" | toBool -}}
{{ $ENABLE_FILE_RECORDING_SERVICE := .Env.ENABLE_FILE_RECORDING_SERVICE | default "false" | toBool -}}
{{ $ENABLE_FILE_RECORDING_SERVICE_SHARING := .Env.ENABLE_FILE_RECORDING_SERVICE_SHARING | default "false" | toBool -}}
{{ $ENABLE_IPV6 := .Env.ENABLE_IPV6 | default "true" | toBool -}}
{{ $ENABLE_LIPSYNC := .Env.ENABLE_LIPSYNC | default "false" | toBool -}}
{{ $ENABLE_NO_AUDIO_DETECTION := .Env.ENABLE_NO_AUDIO_DETECTION | default "false" | toBool -}}
{{ $ENABLE_STUN_TURN := .Env.ENABLE_STUN_TURN | default "true" | toBool -}}
{{ $ENABLE_RECORDING := .Env.ENABLE_RECORDING | default "false" | toBool -}}
{{ $ENABLE_REMB := .Env.ENABLE_REMB | default "true" -}}
{{ $ENABLE_REQUIRE_DISPLAY_NAME := .Env.ENABLE_REQUIRE_DISPLAY_NAME | default "false" | toBool -}}
{{ $ENABLE_SIMULCAST := .Env.ENABLE_SIMULCAST | default "true" -}}
{{ $ENABLE_STATS_ID := .Env.ENABLE_STATS_ID | default "false" | toBool -}}
{{ $ENABLE_STEREO := .Env.ENABLE_STEREO | default "false" | toBool -}}
{{ $ENABLE_TALK_WHILE_MUTED := .Env.ENABLE_TALK_WHILE_MUTED | default "false" | toBool -}}
{{ $ENABLE_TCC := .Env.ENABLE_TCC | default "true" -}}
{{ $ENABLE_TRANSCRIPTIONS := .Env.ENABLE_TRANSCRIPTIONS | default "false" | toBool -}}
{{ $ENABLE_USER_ROLES_BASED_ON_TOKEN := .Env.ENABLE_USER_ROLES_BASED_ON_TOKEN | default "false" -}}
{{ $START_AUDIO_MUTED := .Env.START_AUDIO_MUTED | default 10 -}}
{{ $START_VIDEO_MUTED := .Env.START_VIDEO_MUTED | default 10 -}}
{{ $RESOLUTION := .Env.RESOLUTION | default "720" -}}
{{ $RESOLUTION_MIN := .Env.RESOLUTION_MIN | default "180" -}}
{{ $RESOLUTION_WIDTH := .Env.RESOLUTION_WIDTH | default "1280" -}}
{{ $RESOLUTION_WIDTH_MIN := .Env.RESOLUTION_WIDTH_MIN | default "320" -}}
{{ $TESTING_OCTO_PROBABILITY := .Env.TESTING_OCTO_PROBABILITY | default "0" -}}
{{ $TESTING_CAP_SCREENSHARE_BITRATE := .Env.TESTING_CAP_SCREENSHARE_BITRATE | default "1" -}}
{{ $XMPP_DOMAIN := .Env.XMPP_DOMAIN -}}
{{ $XMPP_RECORDER_DOMAIN := .Env.XMPP_RECORDER_DOMAIN | default "" -}}
{{ $XMPP_RECORDER_DOMAIN_PREFIX := .Env.XMPP_RECORDER_DOMAIN_PREFIX | default "recorder" -}}

if (!config.hasOwnProperty('analytics')) config.analytics = {};

{{ if .Env.AMPLITUDE_ID -}}
// The Amplitude APP Key:
config.analytics.amplitudeAPPKey = '{{ .Env.AMPLITUDE_ID }}';
{{ end -}}

{{ if .Env.GOOGLE_ANALYTICS_ID -}}
// The Google Analytics Tracking ID:
config.analytics.googleAnalyticsTrackingId = '{{ .Env.GOOGLE_ANALYTICS_ID }}';
{{ end -}}

{{ if .Env.ANALYTICS_SCRIPT_URLS -}}
// Array of script URLs to load as lib-jitsi-meet "analytics handlers".
config.analytics.scriptURLs = [ '{{ join "','" (splitList "," .Env.ANALYTICS_SCRIPT_URLS) }}' ];
{{ end -}}

{{ if .Env.ANALYTICS_WHITELISTED_EVENTS -}}
config.analytics.whiteListedEvents = [ '{{ join "','" (splitList "," .Env.ANALYTICS_WHITELISTED_EVENTS) }}' ];
{{ end -}}

{{ if .Env.CALLSTATS_CUSTOM_SCRIPT_URL -}}
config.callStatsCustomScriptUrl = '{{ .Env.CALLSTATS_CUSTOM_SCRIPT_URL }}';
{{ end -}}

{{ if .Env.CALLSTATS_ID -}}
// To enable sending statistics to callstats.io you must provide the
// Application ID and Secret.
config.callStatsID = '{{ .Env.CALLSTATS_ID }}';
{{ end -}}

{{ if .Env.CALLSTATS_ID -}}
config.callStatsSecret = '{{ .Env.CALLSTATS_SECRET }}';
{{ end -}}

{{ if .Env.CHROME_EXTENSION_BANNER_JSON -}}
config.chromeExtensionBanner = {{ .Env.CHROME_EXTENSION_BANNER_JSON }};
{{ end -}}

if (!config.hasOwnProperty('constraints')) config.constraints = {};
if (!config.hasOwnProperty('video')) config.constraints.video = {};
config.constraints.video.height = {ideal: {{$RESOLUTION}}, max: {{$RESOLUTION}}, min: {{$RESOLUTION_MIN}}};
config.constraints.video.width = {ideal: {{$RESOLUTION_WIDTH}}, max: {{$RESOLUTION_WIDTH}}, min: {{$RESOLUTION_WIDTH_MIN}}};

if (!config.hasOwnProperty('deploymentInfo')) config.deploymentInfo = {};

{{ if .Env.DEPLOYMENTINFO_ENVIRONMENT -}}
config.deploymentInfo.environment = '{{ .Env.DEPLOYMENTINFO_ENVIRONMENT }}';
{{ end -}}

{{ if .Env.DEPLOYMENTINFO_ENVIRONMENT_TYPE -}}
config.deploymentInfo.envType = '{{ .Env.DEPLOYMENTINFO_ENVIRONMENT_TYPE }}';
{{ end -}}

{{ if $DEPLOYMENTINFO_USERREGION -}}
config.deploymentInfo.userRegion = '{{ $DEPLOYMENTINFO_USERREGION }}';
{{ end -}}

{{ if .Env.CONFCODE_URL -}}
config.dialInConfCodeUrl = '{{ .Env.CONFCODE_URL }}';
{{ end -}}

{{ if .Env.DIALIN_NUMBERS_URL -}}
config.dialInNumbersUrl = '{{ .Env.DIALIN_NUMBERS_URL }}';
{{ end -}}

{{ if .Env.DIALOUT_AUTH_URL -}}
config.dialOutAuthUrl = '{{ .Env.DIALOUT_AUTH_URL }}';
{{ end -}}

{{ if .Env.DIALOUT_CODES_URL -}}
config.dialOutCodesUrl = '{{ .Env.DIALOUT_CODES_URL }}';
{{ end -}}

// Enable / disable simulcast support.
{{ if $ENABLE_SIMULCAST -}}
config.disableSimulcast = false;
{{ else -}}
config.disableSimulcast = true;
{{ end -}}

{{ if $ENABLE_CALENDAR -}}
config.enableCalendarIntegration = true;
{{ end -}}

{{ if $ENABLE_LIPSYNC -}}
// Lipsync hack in jicofo, may not be safe
config.enableLipSync = true;
{{ end -}}

{{ if $ENABLE_NO_AUDIO_DETECTION -}}
config.enableNoAudioDetection = true;
{{ end -}}

config.enableRemb = {{ $ENABLE_REMB }};

{{ if $ENABLE_STATS_ID -}}
// enables callstatsUsername to be reported as statsId and used
// by callstats as repoted remote id
config.enableStatsID = true;
{{ end -}}

{{ if $ENABLE_TALK_WHILE_MUTED -}}
config.enableTalkWhileMuted = true;
{{ end -}}

config.enableTcc = {{ $ENABLE_TCC }};

// configure client features based on existence of JWT token
config.enableUserRolesBasedOnToken = {{ $ENABLE_USER_ROLES_BASED_ON_TOKEN }};

{{ if .Env.ETHERPAD_URL_BASE -}}
config.etherpad_base = '{{.Env.PUBLIC_URL}}/etherpad/p/';
{{ end -}}

{{ if .Env.INVITE_SERVICE_CALLFLOWS_URL -}}
config.inviteServiceCallFlowsUrl = '{{ .Env.INVITE_SERVICE_CALLFLOWS_URL }}';
{{ end -}}

{{ if .Env.INVITE_SERVICE_URL -}}
config.inviteServiceUrl = '{{ .Env.INVITE_SERVICE_URL }}';
{{ end -}}

{{ if .Env.MICROSOFT_API_APP_CLIENT_ID -}}
config.microsoftApiApplicationClientID = '{{ .Env.MICROSOFT_API_APP_CLIENT_ID }}';
{{ end -}}

{{ if $ENABLE_BRIDGE_CHANNEL }}
// Enables / disables a data communication channel with the Videobridge.
// Values can be 'datachannel', 'websocket', true (treat it as
// 'datachannel'), undefined (treat it as 'datachannel') and false (don't
// open any channel).
config.openBridgeChannel = '{{ $BRIDGE_CHANNEL }}';
{{ end -}}

{{ if .Env.PEOPLE_SEARCH_URL -}}
config.peopleSearchUrl = '{{ .Env.PEOPLE_SEARCH_URL }}';
config.peopleSearchQueryTypes = ['user','conferenceRooms'];
{{ end -}}

{{ if .Env.P2P_STUNTURN -}}
if (!config.hasOwnProperty('p2p')) config.p2p = {};
config.p2p.useStunTurn = true;
{{ end -}}

{{ if $ENABLE_REQUIRE_DISPLAY_NAME -}}
// Require users to always specify a display name.
config.requireDisplayName = true;
{{ else -}}
// No need to specify a display name.
config.requireDisplayName = false;
{{ end -}}

config.resolution = {{ $RESOLUTION }};

config.startAudioMuted = {{ $START_AUDIO_MUTED }};

{{ if .Env.START_BITRATE -}}
config.startBitrate = '{{ .Env.START_BITRATE }}';
{{ end -}}

config.startVideoMuted = {{ $START_VIDEO_MUTED }};

{{ if $ENABLE_STEREO -}}
config.stereo = true;
{{ end -}}

{{ if $ENABLE_TRANSCRIPTIONS }}
// Transcription (in interface_config,
// subtitles and buttons can be configured)
config.transcribingEnabled = true;
{{ end -}}

// testing values, defaults should be sane
if (!config.hasOwnProperty('testing')) config.testing = {};
config.testing.capScreenshareBitrate = {{ $TESTING_CAP_SCREENSHARE_BITRATE }};
if (!config.testing.hasOwnProperty('octo')) config.testing.octo = {};
config.testing.octo.probability = {{ $TESTING_OCTO_PROBABILITY }};

{{ if $ENABLE_IPV6 -}}
// Enable IPv6 support.
config.useIPv6 = true;
{{ else -}}
// Disable IPv6 support.
config.useIPv6 = false;
{{ end -}}

{{ if $ENABLE_STUN_TURN -}}
// Use XEP-0215 to fetch STUN and TURN servers.
config.useStunTurn = true;
{{ else -}}
// Skip STUN and TURN.
config.useStunTurn = false;
{{ end -}}

{{ if $ENABLE_RECORDING }}
// recording settings
{{ if $XMPP_RECORDER_DOMAIN -}}
config.hiddenDomain = '{{ $XMPP_RECORDER_DOMAIN }}';
{{ else -}}
config.hiddenDomain = '{{ $XMPP_RECORDER_DOMAIN_PREFIX }}.{{ $XMPP_DOMAIN }}';
{{ end -}}
// Whether to enable file recording or not
config.fileRecordingsEnabled = true;

// Whether to enable live streaming or not.
config.liveStreamingEnabled = true;
{{ if .Env.DROPBOX_APPKEY -}}
// Enable the dropbox integration.
if (!config.hasOwnProperty('dropbox')) config.dropbox = {};
config.dropbox.appKey = '{{ .Env.DROPBOX_APPKEY }}';
{{ if .Env.DROPBOX_REDIRECT_URI -}}
// A URL to redirect the user to, after authenticating
// by default uses:
// 'https://jitsi-meet.example.com/static/oauth.html'
config.dropbox.redirectURI = '{{ .Env.DROPBOX_REDIRECT_URI }}';
{{ end -}}
{{ end -}}

{{ if $ENABLE_FILE_RECORDING_SERVICE -}}
// When integrations like dropbox are enabled only that will be shown,
// by enabling fileRecordingsServiceEnabled, we show both the integrations
// and the generic recording service (its configuration and storage type
// depends on jibri configuration)
config.fileRecordingsServiceEnabled = true;
{{ end -}}
{{ if $ENABLE_FILE_RECORDING_SERVICE_SHARING -}}
// Whether to show the possibility to share file recording with other people
// (e.g. meeting participants), based on the actual implementation
// on the backend.
config.fileRecordingsServiceSharingEnabled = true;
{{ end -}}
{{ end -}}