import BorderdRactangleButton from '../components/buttons/BorderdRactangleButton';
import NavigationBar from '../components/navigation/NavigationBar';
const App = () => {
    return (
        <>
            <div className="h-screen overflow-y-auto">
                <NavigationBar/>
                <main className="h-full flex-1 bg-blue-50 p-4">Content</main>
                <footer className="flex justify-center items-center bg-blue-200 p-4 text-white">Footer</footer>
            </div>
        </>
    );
};

export default App;
