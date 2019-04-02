This project is an Image Gallery with infinte scroll.
</br>
It was part of a job interview for [Venn](https://venn.city/).
</br>
I used their logo just as a use case.. All rights for the logos belongs to [Venn](https://venn.city/)!
</br>

3rd party libraries and open sources I used for this:
</br>
[undraw](https://undraw.co/illustrations) - no results SVG
</br>
[Flicker api](https://www.flickr.com/) - for image search
</br>
[Create React App](https://github.com/facebook/create-react-app)
</br>
[node-sass](https://github.com/sass/node-sass)
</br>
[react-infinite-scroll-component](https://www.npmjs.com/package/react-infinite-scroll-component)
</br>
[lodash](https://lodash.com/) - for debouncing search results
</br>
redux and thunk
</br></br>

**Notes:**

**timestamp** -  I added timestamp for each search for 2 main reasons:
1. Debounce is nice but a search results can arrive in different order than it was fired in some use cases (examples - lag, number of results 0 vs 30, etc..). this would help us differ which request came first and if needed to ignore an old search
2. To add the timestamp as a key for each result (more later…)

</br>

**image search failed action** - It was added but not implemented.

</br>

**local storage feature** - 
* redux side - the implementation is pretty simple, just subscribe to the store for the wanted values/state and of course add the save and load functions 
* state: search object - I would’ve save each search result as an object with the text and the timestamp.
* state: search object array - I would’ve saved all the objects in an array, when we have new search if the search limit exceeded delete the oldest search object (act’s like a queue). if the search already existed remove it from the array and push it again to the array with the updated the timestamp.
* ui: show the result’s as ‘chips’ in the ui (kinda like when emailing multiple people). when a term is  selected the text/background color would change.
* logic: on select/deselect I would’ve changed the search result (which would require setting the edit text value in the state or get a ref to the input component and change it)

</br>

**other thoughts:**
* optionally put the header (and text input) in a separate functional component (pass the handleSearch function as argument).
* handle errors more ‘properly’
* optionally add error handling specific to the api (commented in the api)
