# Project Prompts

A chronological log of all user prompts used to build and iterate on this application.

## 1. Initial UI Replication
> replicate the UI of: https://www.amazon.sg/s?k=iphone+duo+case&crid=3I3VKAUZ3AICD&sprefix=iphone+%2Caps%2C256&ref=nb_sb_ss_ts-doa-p_1_7

## 2. Git Push Request
> git push https://[REDACTED_TOKEN]@https://github.com/KeziahVickraman/amazon-duo-case.git

*(Repeated once; personal access token redacted for security.)*

## 3. Vercel Deployment Dependency Fix
> errror call here when deploying on vercel fix it:
>
> ```text
> 11:51:13.338 Running build in Washington, D.C., USA (East) – iad1
> 11:51:13.339 Build machine configuration: 2 cores, 8 GB
> 11:51:13.456 Cloning github.com/KeziahVickraman/amazon-duo (Branch: main, Commit: dc60c07)
> 11:51:13.458 Previous build caches not available.
> 11:51:14.156 Cloning completed: 698.000ms
> 11:51:15.923 Running "vercel build"
> 11:51:15.931 Vercel CLI 65.17.0
> 11:51:16.591 Installing dependencies...
> 11:51:17.239 npm warn Unknown env config "cache-dir". This will stop working in the next major version of npm. See `npm help npmrc` for supported config options.
> 11:51:29.082 npm error code ERESOLVE
> 11:51:29.082 npm error ERESOLVE could not resolve
> 11:51:29.082 npm error
> 11:51:29.083 npm error Found: esbuild@0.25.12
> 11:51:29.083 npm error node_modules/esbuild
> 11:51:29.083 npm error   dev esbuild@"^0.25.0" from the root project
> 11:51:29.083 npm error
> 11:51:29.084 npm error Could not resolve dependency:
> 11:51:29.084 npm error peerOptional esbuild@"^0.27.0 || ^0.28.0" from vite@8.3.8
> 11:51:29.084 npm error node_modules/vite
> 11:51:29.084 npm error   vite@"^8.3.0" from the root project
> 11:51:29.084 npm error   peer vite@"^5.2.0 || ^6 || ^7 || ^8" from @tailwindcss/vite@4.3.5
> 11:51:29.085 npm error   node_modules/@tailwindcss/vite
> 11:51:29.085 npm error     @tailwindcss/vite@"^4.3.3" from the root project
> 11:51:29.085 npm error   1 more (@vitejs/plugin-react)
> 11:51:29.085 npm error
> 11:51:29.085 npm error Conflicting peer dependency: esbuild@0.28.2
> 11:51:29.085 npm error node_modules/tsx/node_modules/esbuild
> 11:51:29.085 npm error   peerOptional esbuild@"^0.27.0 || ^0.28.0" from vite@8.3.8
> 11:51:29.085 npm error   node_modules/vite
> 11:51:29.085 npm error     vite@"^8.3.0" from the root project
> 11:51:29.085 npm error     peer vite@"^5.2.0 || ^6 || ^7 || ^8" from @tailwindcss/vite@4.3.5
> 11:51:29.086 npm error     node_modules/@tailwindcss/vite
> 11:51:29.086 npm error       @tailwindcss/vite@"^4.3.3" from the root project
> 11:51:29.086 npm error     1 more (@vitejs/plugin-react)
> 11:51:29.086 npm error
> 11:51:29.086 npm error Fix the upstream dependency conflict, or retry this command with --force or --legacy-peer-deps to accept an incorrect (and potentially broken) dependency resolution.
> 11:51:29.086 npm error
> 11:51:29.086 npm error
> 11:51:29.086 npm error For a full report see:
> 11:51:29.086 npm error /vercel/.npm/_logs/2026-11-19T03_51_16_822Z-eresolve-report.txt
> 11:51:29.086 npm error A complete log of this run can be found in: /vercel/.npm/_logs/2026-11-19T03_51_16_822Z-debug-0.log
> 11:51:29.169 Error: [BUILD_UTILS_SPAWN_1] Command "npm install" exited with 1
> ```

## 4. 1-Click Purchase Button
> add a one click button right below the add to cart button.

## 5. Microsoft Clarity Embed
> embed microsoft clarity to this webpage using the following code:
>
> ```html
> <script type="text/javascript">
>     (function(c,l,a,r,i,t,y){
>         c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
>         t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
>         y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
>     })(window, document, "clarity", "script", "zfzuxvxsmd");
> </script>
> ```

## 6. Prompt Collation
> collate all prompts and store it under PROMPTS.md
