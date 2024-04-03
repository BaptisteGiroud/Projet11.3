function FeatureItem({ h3, p, src, alt }) {
  return (
    <div className="feature-item">
      <img src={src} alt={`${alt} Icon`} className="feature-icon" />
      <h3 className="feature-item-title">{h3}</h3>
      <p>{p}</p>
    </div>
  );
}

export default FeatureItem;
