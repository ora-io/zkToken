# Test script for zkToken

# Update `config.js` with your own parameters first!
# Then run `sh test.sh`

npm run whale
npm run compile-local && npm run exec-local -- 18518315
npm run prove-local -- --prove 18518315 53ad370d0200000200000000

npm run compile && npm run setup
npm run prove -- --prove 18518315 53ad370d0200000200000000