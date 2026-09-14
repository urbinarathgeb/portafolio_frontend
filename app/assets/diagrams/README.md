# Diagramas

Fuentes editables de las imágenes que no son capturas de pantalla.

- `cutlog-diagram.svg` → `public/images/projects/cutlog/preview.png` (1500×1000).
  Para regenerar el PNG después de editar el SVG:

  ```bash
  "/ruta/a/Google Chrome" --headless=new --hide-scrollbars --window-size=1500,1000 \
    --screenshot=public/images/projects/cutlog/preview.png \
    "file://$PWD/app/assets/diagrams/cutlog-diagram.svg"
  ```
