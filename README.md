# rs256-demo

## Cài đặt
``` bash
npm install express jsonwebtoken fs
npm install @types/express --save-dev
npm i -D @types/jsonwebtoken @types/node
```

## Cấu trúc thư mục
```
/project
  /keys
    private.key
    public.key
  /src
    app.ts
  /tsconfig.json
```

### private.key (có thể tự tạo bằng OpenSSL)
Tạo một private key trong thư mục /keys bằng cách sử dụng OpenSSL:

``` bash
openssl genpkey -algorithm RSA -out keys/private.key -pkeyopt rsa_keygen_bits:2048
```

Tạo một public key từ private key:

``` bash
openssl rsa -pubout -in keys/private.key -out keys/public.key
```

## Prisma Adapter
``` bash
yarn add @prisma/adapter-mariadb mariadb
```