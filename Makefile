lint:
	npx eslint .

publish:
	npm publish --dry-run

run:
	bin/gendiff.js

install-deps:
	npm ci

install: install-deps
	 npx simple-git-hooks

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

