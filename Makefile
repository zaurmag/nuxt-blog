build:
	docker build -t nuxtBlog .

run:
	docker run -d -p 3000:3000 --name nuxtBlog --rm tgbot
