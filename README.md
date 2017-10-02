# RestComm Docker image

RestComm is a next generation Cloud Communications Platform to rapidly build voice, video, and messaging applications, using mainstream development skills. Created by the people at Telestax.


Using the RestComm docker image makes running RestComm easy and intuitive.

1. See the [Quick Start User Guide](http://documentation.telestax.com/connect/configuration/docker/Restcomm%20-%20Docker%20Quick%20Start%20Guide.html)
2. Please report any issues at https://github.com/RestComm/Restcomm-Docker/issues

### Build

To build the image:

First git clone this repository and then:

```docker build -t restcomm/restcomm:latest -f Dockerfile .```

__Make sure you don't skip the dot (.) at the end of the command__

__-t Name and optionally a tag in the 'name:tag' format__

__-f Docker file to use for build the container__

Docker official links:
[Docker build manual](https://docs.docker.com/engine/reference/commandline/build/)


### Runing sample

1. Edit ```enviroment``` file with your SMTP and VoiceRss credentials.

```
RCBCONF_VOICERSS_KEY=

RCADVCONF_SMTP_HOST=smtp.sendgrid.net
RCADVCONF_SMTP_USER=apikey
RCADVCONF_SMTP_PASSWORD=
RCADVCONF_SMTP_PORT=465
```

2. Run instance

```docker run -i -d --name=restcomm --env-file ./enviroment -p 80:80 -p 443:443 -p 8443:8443 -p 5060:5060 -p 65000-65050:65000-65050/udp restcomm:latest```

3. Shell into instance

```docker exec -it restcomm /bin/bash```

4. Setup voice mail app for incoming number +1234

Login to Restcomm Console, edit Number +1234 to use a GET URL for voice:

GET: ```http://localhost:3000?client=alice&name=Alice&email=[YOUR_EMAIL]```

You can use the query strings to customize the target client.

5. Login with bob using Olympus and dial to +1234


