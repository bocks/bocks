# bocks

Code Annotation

## Getting Started

### Development

#### Get the code

* Fork and clone this repo
* `npm install`

#### Setup OAuth

* Create a [Github Developer Application](https://github.com/settings/developers)
	* Use `http://127.0.0.1:1337` for the Homepage URL
	* Use `http://127.0.0.1:1337/auth/github/callback` for the Authorization Callback URL

* Add the `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` you receive for your application to environment variables as `BOCKS_CLIENT_ID` and `BOCKS_CLIENT_SECRET`.
		
		export BOCKS_CLIENT_ID='GITHUB_CLIENT_ID'
		export BOCKS_CLIENT_SECRET='GITHUB_CLIENT_SECRET'
		
#### Setup Session Secret

* Add `BOCKS_SESSION_SECRET` to environment variables.

		export BOCKS_SESSION_SECRET='itsasecrettoeveryone'

#### Start up Mongo

* Start up mongo

#### Start the App

* `npm start`
* Browse to [http://127.0.0.1:1337](http://127.0.0.1:1337)

### Deployment

See [deployment.md](docs/deployment.md) for how to deploy.

## Documentation

* [Authentication](docs/authentication.md)
* [Schema](docs/schema.md)
* [Server Endpoints](docs/endpoints.md)

## Team

* [Nicole Skoglund](https://github.com/NCSkoglund)
* [Daniel Fiore](https://github.com/taptapdan)
* [Mario Yeung](https://github.com/marioyeung)
* [Drew Kosta](https://github.com/drewkosta)