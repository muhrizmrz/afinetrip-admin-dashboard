
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import SearchSummary from '../components/search/SearchSummary';
const FlightResultPage = () => {

  return (
    <div className="gradient-bg min-h-screen flex flex-col">
      <Header />
        <main>
            <SearchSummary />
        </main>
      <Footer />  
    </div>
  );
};

export default FlightResultPage;