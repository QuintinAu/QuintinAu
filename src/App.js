import React, {useState} from 'react';
import './App.css';

const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <img id="logo" src={require('./apihunt-logo.png')} />
      </div>
      <nav>
        <ul>
          <li>Story</li>
          <li>APIs</li>
          <li>Login</li>
        </ul>
      </nav>
    </header>
  );
}

const Upvote = () => {

  const [counter, setCounter] = useState(0);
  const updateCounter = () => {
    setCounter(counter + 1);
  };


  const [hovered, setHovered] = useState('');
  const toggleHover = () => {
    setHovered(!hovered);
  };

  return (
    <div className="upvote-box">
      <i className={hovered ? "fas fa-caret-square-up fa-2x" : "far fa-caret-square-up fa-2x"} onClick={updateCounter} onMouseEnter={toggleHover} onMouseLeave={toggleHover} />
      <p>{counter}</p>
    </div>
  )
};


const ListBox = (props) => {

  return (
    <div className="list-box">
      <img src={props.image} />
      <div className="text-box">
        <h1>{props.name}</h1>
        <p>{props.text}</p>
      </div>
      <Upvote />
    </div>
  )
};

const FilterTab = (props) => {

  const [tabColor, toggleTabColor] = useState('rgb(201, 201, 201)')

  const setColor = (color) => {
    if (color) {
      toggleTabColor(color);
    } else {
      toggleTabColor('rgb(201, 201, 201)')
    }
  };

  return (
    <div className="pop-filter" style={{color: tabColor, borderBottom: '1px solid ' + tabColor}} onMouseOver={() => setColor('grey')} onMouseOut={() => setColor()}>
      <p>{props.tabName}</p>
    </div>
  )
}

const SearchSection = () => {

  const initialList = [
    { 
      name: "Foxer API",
      image: require("./api-foxer-icon.png"),
      text: "Provides all items on sale from major clothing retailers H&M, Uniqlo, Zara, Artizia, and Lululemon.",
      tags: ["clothing","retail","shopping","jackets","sales", "stores", "deals"]
    },
    { 
      name: "Public Bussin API",
      image: require("./api-public-bussin-icon.png"),
      text: "Access to minute-by-minute updates of public transit buses in major cities across North America.",
      tags: ["transportation","buses","cars","travel","public transit","location","bus stops","bus times"]
    },
    { 
      name: "Stonks API",
      image: require("./api-stonks-icon.png"),
      text: "Allows you to pull stock & market data on TSX & NYSE.",
      tags: ["finance","money","bank","cash","banking", "trading", "stocks"]
    }
  ];

  const [search, setSearch] = useState('');
  const [list, setList] = useState(initialList);
  const [newList, setNewList] =useState(initialList);

  const updateSearch = e => {

    setSearch(e.target.value);
    setNewList([]);
    setNewList(list.filter(item => 
      item.tags.some(tag => tag.toLowerCase().includes(e.target.value)) || 
      item.name.toLowerCase().includes(e.target.value) ));

    };

/* Need to implement a list, that's filtered */


  return (
    <div className="search-header">
      <img id="search-logo" src={require('./apihunt-logo.png')} />
      <h2>#1 resource for free, public, & reviewed APIs</h2>
      <i className="fas fa-search"></i>
      <input type="text" placeholder="Search a category" onChange={updateSearch} value={search} />

      <div className="pop-filter-tabs">
        <FilterTab tabName="Hot" />
        <FilterTab tabName="Top" />
        <FilterTab tabName="New" />
      </div>

      <div className="list-section">
        {newList.map((box) => (
          <ListBox name={box.name} image={box.image} text={box.text}/>
        ))}
      </div>
    </div>
  );
}



const App = () => {
  return (
    <main>
      <Header />
      <SearchSection />
    </main>
  );
}

export default App;
