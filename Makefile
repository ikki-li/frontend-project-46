lint:
	npx eslint

publish:
	npm publish --dry-run

gendiff:
	bin/gendiff.js
