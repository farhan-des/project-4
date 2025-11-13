<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Blog - Calculator Tools</title>
    <meta name="description" content="Read our latest blog posts about calculators, productivity tools, and helpful tips.">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-gray-50 dark:bg-gray-900">
    <header class="bg-white dark:bg-gray-800 shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white" data-testid="text-page-title">Calculator Tools Blog</h1>
                <a href="/" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium" data-testid="link-home">
                    ← Back to Calculators
                </a>
            </div>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Latest Articles</h2>
            <p class="text-gray-600 dark:text-gray-400">Explore our collection of helpful articles and guides</p>
        </div>

        @if($posts->count() > 0)
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                @foreach($posts as $post)
                    <article class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300" data-testid="card-post-{{ $post->id }}">
                        <a href="{{ route('blog.show', $post->slug) }}" class="block" data-testid="link-post-{{ $post->id }}">
                            @if($post->featured_image)
                                <img src="{{ asset('storage/' . $post->featured_image) }}" alt="{{ $post->title }}" class="w-full h-48 object-cover" data-testid="img-featured-{{ $post->id }}">
                            @else
                                <div class="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                    <span class="text-white text-4xl font-bold">{{ substr($post->title, 0, 1) }}</span>
                                </div>
                            @endif
                            
                            <div class="p-6">
                                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400" data-testid="text-post-title-{{ $post->id }}">
                                    {{ $post->title }}
                                </h3>
                                
                                <p class="text-gray-600 dark:text-gray-400 mb-4" data-testid="text-post-excerpt-{{ $post->id }}">
                                    {{ Str::limit($post->excerpt, 120) }}
                                </p>
                                
                                <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                    <span data-testid="text-post-date-{{ $post->id }}">{{ $post->published_at->format('M d, Y') }}</span>
                                    <span class="text-blue-600 dark:text-blue-400 hover:underline">Read more →</span>
                                </div>
                            </div>
                        </a>
                    </article>
                @endforeach
            </div>

            <div class="mt-12">
                {{ $posts->links() }}
            </div>
        @else
            <div class="text-center py-12">
                <p class="text-xl text-gray-600 dark:text-gray-400" data-testid="text-no-posts">No blog posts available yet. Check back soon!</p>
            </div>
        @endif
    </main>

    <footer class="bg-white dark:bg-gray-800 shadow mt-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p class="text-center text-gray-600 dark:text-gray-400">© {{ date('Y') }} Calculator Tools. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
