# Deployment

Automatic deployment is setup to trigger on commits to the `production` branch of `bocks/bocks`.

## How To Deploy

TODO

* `git pull remote production`
* `git push remote production`

## Deployment Setup

Create a Digital Ocean Droplet using the `MEAN on 14.04` one-click app.

Log onto droplet.

	ssh root@droplet-ip-address

(Droplet) Create `/var/www` directory.

	adduser deploy
	chown -R deploy:deploy /var/www

(Locally) Create an ssh key for Travis to log in with. When asked, provide the output filename of `deploy_key`.

	ssh-keygen

(Droplet) Login with `deploy` user

	su - deploy

(Droplet) Create and `authorized_keys` file:

	mkdir ssh
	chmod 700 .ssh
	nano .ssh/authorized_keys

(Locally / Droplet) Copy the contents of `deploy_key` that was created earlier into the `authorized_keys` file that is on the server.

(Droplet) Restrict permissions on `authorized_keys` file.

	chmod 600 .ssh/authorized_keys

