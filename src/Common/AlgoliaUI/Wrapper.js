export const withAlgoliaHits = (Component) => {
    const Wrapper = (props) => {
      return (
        <Component {...props} />
      );
    };
    
    return Wrapper;
};