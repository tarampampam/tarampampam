#!/usr/bin/make
SHELL = /bin/bash

# Image page: <https://hub.docker.com/r/klakegg/hugo>
HUGO_IMAGE := klakegg/hugo:0.101.0-ext-alpine
RUN_ARGS = --rm -v "$(shell pwd):/src:rw" --user "$(shell id -u):$(shell id -g)"

.PHONY : help shell start clean
.DEFAULT_GOAL : help

help: ## Show this help
	@printf "\033[33m%s:\033[0m\n" 'Available commands'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[32m%-18s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

shell: ## Open shell into container with hugo
	docker run $(RUN_ARGS) -ti --entrypoint /bin/sh $(HUGO_IMAGE)

start: ## Start local hugo live server
	docker run $(RUN_ARGS) -p 1313:1313 -ti $(HUGO_IMAGE) server \
		--watch \
		--logFile /dev/stdout \
		--environment development \
		--baseURL 'http://127.0.0.1:1313/' \
		--port 1313 \
		--bind 0.0.0.0

pdf: ## Generate PDF files
	docker run $(RUN_ARGS) -e "HUGO_RELATIVEURLS=true" -e "HUGO_GOOGLEANALYTICS=" $(HUGO_IMAGE) --minify -d ./4pdf
	wkhtmltopdf --lowquality ./4pdf/ru/index.html ./cv.pdf
	-rm -R ./4pdf

clean: ## Make some clean
	-rm -R ./public ./resources ./.hugo_build.lock
