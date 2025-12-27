import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articulos = await getCollection('articulos');
  
  // Ordenar por fecha descendente
  const lista = articulos.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    // Título del feed
    title: 'Raíz Verde - Sostenibilidad tecnológica y proyectos forestales',
    // Descripción del feed
    description: 'Artículos semanales sobre diseño web verde, tecnología sostenible y proyectos ambientales.',
    // URL base del sitio
    site: context.site,
    
    // Cada artículo en el feed
    items: lista.map((articulo) => ({
      title: articulo.data.title,
      pubDate: articulo.data.date,
      description: articulo.data.description,
      link: `/articulos/${articulo.slug}/`,
    })),
    
    // Idioma
    customData: `<language>es-es</language>`,
  });
}