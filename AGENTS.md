<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Mount the session-scoped agency opening in the root layout, and integrate its reusable signature into the existing page footer, to avoid restarting on navigation or duplicating footers.
- Keep agency opening timing and contact constants in a browser-safe module, and load the original agency logo through its asset pointer, for consistent behavior and lossless identity reuse.
