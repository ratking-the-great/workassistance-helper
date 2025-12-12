import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pipe/:type/size/:medium',
    renderMode: RenderMode.SSR
  },
  {
    path: 'pipe/:type',
    renderMode: RenderMode.SSR
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
