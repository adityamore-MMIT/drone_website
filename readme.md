# Setup Three.js project
>1. Use importmap into html as:
```
<!-- example -->
<script type="importmap">
      {
        "imports": {
          "three": "/node_modules/three/build/three.module.js",
        }
      }
    </script>
```

>2. Install three.js, loadash
```
npm i three --save-dev
npm i loadash --save-dev
```
>3. serve files locally with
```
npx serve
```
>4. Success!!!