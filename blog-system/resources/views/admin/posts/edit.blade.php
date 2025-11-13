<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Edit Blog Post') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <form action="{{ route('admin.posts.update', $post) }}" method="POST" enctype="multipart/form-data" data-testid="form-edit-post">
                        @csrf
                        @method('PUT')

                        <div class="mb-6">
                            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title*</label>
                            <input type="text" id="title" name="title" value="{{ old('title', $post->title) }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required data-testid="input-title">
                            @error('title')
                                <p class="mt-2 text-sm text-red-600 dark:text-red-500" data-testid="error-title">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="mb-6">
                            <label for="featured_image" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Featured Image</label>
                            @if($post->featured_image)
                                <div class="mb-2">
                                    <img src="{{ asset('storage/' . $post->featured_image) }}" alt="Current featured image" class="h-32 rounded" data-testid="img-current-featured">
                                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Current image</p>
                                </div>
                            @endif
                            <input type="file" id="featured_image" name="featured_image" accept="image/*" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" data-testid="input-featured-image">
                            @error('featured_image')
                                <p class="mt-2 text-sm text-red-600 dark:text-red-500" data-testid="error-featured-image">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="mb-6">
                            <label for="excerpt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Short Description (Excerpt)*</label>
                            <textarea id="excerpt" name="excerpt" rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required data-testid="input-excerpt">{{ old('excerpt', $post->excerpt) }}</textarea>
                            @error('excerpt')
                                <p class="mt-2 text-sm text-red-600 dark:text-red-500" data-testid="error-excerpt">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="mb-6">
                            <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Content*</label>
                            <textarea id="content" name="content" rows="12" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required data-testid="input-content">{{ old('content', $post->content) }}</textarea>
                            @error('content')
                                <p class="mt-2 text-sm text-red-600 dark:text-red-500" data-testid="error-content">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="mb-6">
                            <label for="meta_title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SEO Meta Title</label>
                            <input type="text" id="meta_title" name="meta_title" value="{{ old('meta_title', $post->meta_title) }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" data-testid="input-meta-title">
                            @error('meta_title')
                                <p class="mt-2 text-sm text-red-600 dark:text-red-500" data-testid="error-meta-title">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="mb-6">
                            <label for="meta_description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SEO Meta Description</label>
                            <textarea id="meta_description" name="meta_description" rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" data-testid="input-meta-description">{{ old('meta_description', $post->meta_description) }}</textarea>
                            @error('meta_description')
                                <p class="mt-2 text-sm text-red-600 dark:text-red-500" data-testid="error-meta-description">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="mb-6">
                            <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status*</label>
                            <select id="status" name="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" data-testid="select-status">
                                <option value="draft" {{ old('status', $post->status) === 'draft' ? 'selected' : '' }}>Draft</option>
                                <option value="published" {{ old('status', $post->status) === 'published' ? 'selected' : '' }}>Published</option>
                            </select>
                            @error('status')
                                <p class="mt-2 text-sm text-red-600 dark:text-red-500" data-testid="error-status">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="mb-6">
                            <label for="published_at" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Publish Date</label>
                            <input type="datetime-local" id="published_at" name="published_at" value="{{ old('published_at', $post->published_at ? $post->published_at->format('Y-m-d\TH:i') : '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" data-testid="input-published-at">
                            @error('published_at')
                                <p class="mt-2 text-sm text-red-600 dark:text-red-500" data-testid="error-published-at">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="flex items-center gap-4">
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" data-testid="button-submit">Update Post</button>
                            <a href="{{ route('admin.posts.index') }}" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" data-testid="link-cancel">Cancel</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
