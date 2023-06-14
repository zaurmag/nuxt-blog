build:
	docker build -t nuxtblog .

run:
	docker run -d -p 3000:3000 --name nuxtblog --rm nuxtblog
