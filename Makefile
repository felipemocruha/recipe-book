SHELL:= /bin/bash

fmt:
	yapf -r -i --style config/yapf recipe_book
	prettier --no-semi --tab-width 4 --write $(shell find ui/src -type f)
