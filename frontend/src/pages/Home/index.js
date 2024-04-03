import FeatureItem from "../../components/FeatureItem";
import data from "../../datas/icons.json";

function Home() {
  const icons = data.icons;
  return (
    <main>
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {icons.map((icon, index) => (
          <FeatureItem
            key={index}
            h3={icon.h3}
            p={icon.p}
            src={icon.src}
            alt={icon.icon}
          />
        ))}
      </section>
    </main>
  );
}

export default Home;
