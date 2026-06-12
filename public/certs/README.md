# Certificate previews

Drop certificate preview images here and reference them from the `CERTS` array
in `src/components/sections/Certification.tsx`.

## Add a certificate image

1. Save the image here, e.g. `public/certs/ethical-hacker.png`.
2. In `Certification.tsx`, set the matching cert's `image` field:

   ```ts
   { id: "06", title: "Ethical Hacker", /* ... */ image: "/certs/ethical-hacker.png", credentialUrl: "..." }
   ```

The preview frame uses `object-fit: contain` (landscape ~1.55:1), so the whole
certificate is shown without cropping. No image → tasteful placeholder card.

## Add the verify / LinkedIn link

Set `credentialUrl` to the LinkedIn credential page or official verification URL:

```ts
credentialUrl: "https://www.linkedin.com/in/.../details/certifications/..."
```

While it is `"#"`, the button shows a non-clickable "Credential Link Soon"
state. Once a real URL is set, it becomes an active "View Credential" button
that opens in a new tab.
