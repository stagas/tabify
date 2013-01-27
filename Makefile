
build: components index.js tabify.css
	@component-build --dev

components: component.json
	@component-install --dev

clean:
	rm -rf components build

.PHONY: clean
