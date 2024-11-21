# inspired by yeets-api's justfile
_install:
   @npm install

# runs development server locally
dev: _install
  npm run dev

# populates all files in deploy folder (mainly used for local dev)
deploy: _install
  npm run build
