# inspired by yeets-api's justfile
install:
  npm install

dev:
  npm run dev

# populates all files in deploy folder (mainly used for local dev)
deploy:
  npm run build

# removes all files from deploy folder (mainly used for local dev)
undeploy:
  find ./docs -mindepth 1 ! -name 'CNAME' -exec rm -rf {} +
  