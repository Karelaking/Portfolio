import BorderdRactangleButton from '../components/buttons/BorderdRactangleButton';
const App = () => {
    return (
        <>
            <div class="h-screen overflow-y-auto">
                <header class="sticky top-0 bg-blue-200 p-4">Header</header>
                <main class="h-full flex-1 bg-blue-50 p-4">Content</main>
                <footer class="flex justify-center items-center bg-blue-200 p-4 text-white">Footer</footer>
            </div>
        </>
    );
};

export default App;
