import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getfiltermovies } from '../../Actions/MovieActions';
import { groups } from './GroupNum'
import { getcategories } from '../../Actions/CategoryActions';
import Checkbox from './Checkbox';
import Radiobox from './Radiobox';
//import { Radio } from 'antd';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom'
import NavBar_Home from '../../Components/Home/NavBar_Home';

// import Paper from '@mui/material/Paper';
// import InputBase from '@mui/material/InputBase';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
function Allmovies(props) {

    const { categories } = useSelector(state => state.categories);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getcategories())
        LoadfilterResults(myFilters.filters)

        // Get all "navbar-burger" elements
        const $navbarBurgers = document.querySelectorAll('.navbar-burger')

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });

    }, [])

    const [limit, setlimit] = useState(12)
    const [skip, setskip] = useState(0)
    const [type, settype] = useState(false);
    const [size, setsize] = useState(0)
    const [filterResults, setfilterResults] = useState(0)
    const [myFilters, setmyFilters] = useState({
        filters: { area: [], groups: [] }
    })


    const handleFilters = (filters, filterby) => {
        const newfilter = { ...myFilters }
        newfilter.filters[filterby] = filters
        if (filterby == "groups") {
            let pricevalues = handleprice(filters)
            newfilter.filters[filterby] = pricevalues
        }
        LoadfilterResults(myFilters.filters)
        setmyFilters(newfilter)
    }
    function handleprice(values) {
        const data = groups
        let array = []
        for (let key in data) {
            if (data[key]._id === parseInt(values)) {
                array = data[key].array
            }
        }
        return array;
    }


    function LoadfilterResults(newfilter) {

        getfiltermovies(skip, limit, newfilter).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setfilterResults(data.data)
                setsize(data.size)
                setskip(0)
            }
        })
    }

    const loadmorebutton = () => {
        return (
            size > 0 && size >= limit && (
                <button className='button is-warning' onClick={loadmore}>
                    loadMore
                </button>
            )
        )
    }

    // const searchbar = () => {
    //     return (
    //         <Paper

    //             component="form"
    //             sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
    //         >

    //             <InputBase
    //                 sx={{ ml: 1, flex: 1 }}
    //                 placeholder="dd"
    //                 inputProps={{ 'aria-label': 'search google maps' }}
    //             />
    //             <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
    //                 <SearchIcon />
    //             </IconButton>
    //             <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

    //         </Paper>
    //     )
    // }

    function loadmore() {
        let toskip = skip + limit
        getfiltermovies(toskip, limit, myFilters.filters).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setfilterResults([...filterResults, ...data.data])
                setsize(data.size)
                setskip(toskip)
            }
        })
    }


    return (
        <>
            <NavBar_Home />

            <section className="hero is-fullheight-with-navbar movie-div all-home-flexs">

                <div className="hero-body">
                    <div className="container is-fluid">

                        <div className='title is-2 has-text-white'>All Movies</div><br />
                        <div className="columns">
                            <div className="column is-2">

                                <div className='container'>
                                    <div className=''>
                                        <div className='title is-4 has-text-white'>Category</div>
                                        <Checkbox areas={categories}
                                            handleFilters={filters => handleFilters(filters, 'area')} />

                                    </div>
                                </div>

                                <div className='container'>
                                    <div Group className='radio'>
                                        <br /><h3 className='title is-4 has-text-white'>Ratings</h3>
                                        <Radiobox groups={groups}
                                            handleFilters={filters => handleFilters(filters, 'groups')} />
                                    </div>
                                </div>

                            </div>
                            <div className="column">
                                <div className='columns is-multiline '>
                                    {filterResults ? (filterResults.map((mov, i) => (
                                        <div key={i} className='column is-2 '>
                                            <Link to={`/view/${mov._id}`}><MovieCard movie={mov} /></Link>
                                        </div>

                                    ))) : ''}
                                </div>
                                {loadmorebutton()}
                            </div>
                        </div>



                    </div>
                </div>
            </section>
        </>
    );
}

export default Allmovies;