# The test suite requires a symlink to the current implmenetation 
default:
	./js --no-baseline --no-ion -f base.js -f test.js -f run.js

jit:
	./js --no-ion -f base.js -f test.js -f run.jit.js

ion:
	./js -f base.js -f test.js -f run.ion.js

optimized:
	./js --no-baseline --no-ion -f base.js -f test.js -f run.js
	./js --no-ion -f base.js -f test.js -f run.jit.js
	./js -f base.js -f test.js -f run.ion.js

debug:
	./js_debug --no-baseline --no-ion -f base.js -f test.js -f run.js
	./js_debug -no-ion -f base.js -f test.js -f run.jit.js
	./js_debug -f base.js -f test.js -f run.ion.js

sunspider-run:
	(cd ../../SunSpider && ./sunspider --shell=../build_OPT.OBJ/dist/bin/js --run=30 --suite=sunspider-0.9.1)

octane-run:
	(cd ../../octane && ../build_OPT.OBJ/dist/bin/js run.js)
