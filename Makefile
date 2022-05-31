install:
	npm ci

publish:
	npm publish --dry-run
	npm link

lint:
	npx eslint --fix bin/ . index.js

test:
	npm test

.PHONY: test
