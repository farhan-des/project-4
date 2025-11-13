<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $post->meta_title ?? $post->title }} - Calculator Tools Blog</title>
    <meta name="description" content="{{ $post->meta_description ?? Str::limit($post->excerpt, 160) }}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:title" content="{{ $post->meta_title ?? $post->title }}">
    <meta property="og:description" content="{{ $post->meta_description ?? Str::limit($post->excerpt, 160) }}">
    @if($post->featured_image)
    <meta property="og:image" content="{{ asset('storage/' . $post->featured_image) }}">
    @endif
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $post->meta_title ?? $post->title }}">
    <meta name="twitter:description" content="{{ $post->meta_description ?? Str::limit($post->excerpt, 160) }}">
    @if($post->featured_image)
    <meta name="twitter:image" content="{{ asset('storage/' . $post->featured_image) }}">
    @endif
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .prose { max-width: 65ch; }
        .prose p { margin-bottom: 1.25em; }
        .prose h2 { font-size: 1.5em; font-weight: 700; margin-top: 2em; margin-bottom: 1em; }
        .prose h3 { font-size: 1.25em; font-weight: 600; margin-top: 1.6em; margin-bottom: 0.6em; }
        .prose ul, .prose ol { margin-left: 1.5em; margin-bottom: 1.25em; }
        .prose li { margin-bottom: 0.5em; }
        .prose a { color: #2563eb; text-decoration: underline; }
        .prose a:hover { color: #1d4ed8; }
        .prose strong { font-weight: 600; }
        .prose code { background-color: #f3f4f6; padding: 0.2em 0.4em; border-radius: 0.25em; font-size: 0.9em; }
        .prose img { border-radius: 0.5em; margin-top: 2em; margin-bottom: 2em; }
    </style>
</head>
<body class="bg-gray-50 dark:bg-gray-900">
    <header class="bg-white dark:bg-gray-800 shadow">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div class="flex justify-between items-center">
                <a href="{{ route('blog.index') }}" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium" data-testid="link-back">
                    ← Back to Blog
                </a>
                <a href="/" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 font-medium" data-testid="link-home">
                    Home
                </a>
            </div>
        </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article>
            <header class="mb-8">
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-post-title">
                    {{ $post->title }}
                </h1>
                
                <div class="flex items-center text-gray-600 dark:text-gray-400 mb-6">
                    <time datetime="{{ $post->published_at->toISOString() }}" data-testid="text-published-date">
                        {{ $post->published_at->format('F d, Y') }}
                    </time>
                    @if($post->user)
                        <span class="mx-2">•</span>
                        <span data-testid="text-author">By {{ $post->user->name }}</span>
                    @endif
                </div>

                @if($post->featured_image)
                    <img src="{{ asset('storage/' . $post->featured_image) }}" 
                         alt="{{ $post->title }}" 
                         class="w-full h-auto rounded-lg shadow-lg mb-8"
                         data-testid="img-featured">
                @endif
            </header>

            <div class="prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed" data-testid="content-post">
                {!! nl2br(e($post->content)) !!}
            </div>
        </article>

        <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div class="flex justify-between items-center">
                <a href="{{ route('blog.index') }}" class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors" data-testid="button-back-to-blog">
                    ← Back to All Posts
                </a>
                
                <div class="flex gap-3">
                    <a href="https://twitter.com/intent/tweet?text={{ urlencode($post->title) }}&url={{ urlencode(route('blog.show', $post->slug)) }}" 
                       target="_blank" 
                       class="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                       data-testid="link-share-twitter">
                        <span class="sr-only">Share on Twitter</span>
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                    </a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u={{ urlencode(route('blog.show', $post->slug)) }}" 
                       target="_blank" 
                       class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                       data-testid="link-share-facebook">
                        <span class="sr-only">Share on Facebook</span>
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
                    </a>
                </div>
            </div>
        </div>
    </main>

    <footer class="bg-white dark:bg-gray-800 shadow mt-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p class="text-center text-gray-600 dark:text-gray-400">© {{ date('Y') }} Calculator Tools. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
