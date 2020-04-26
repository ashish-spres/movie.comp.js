const createAutoComplete = ({
    root,
    renderOption, 
    onOptionSelect, 
    inputValue,
    fetchData
}) => {
    root.innerHTML = `
        <label><b>Search</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;

    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

    const onInput = async (ev) => {
        const items = await fetchData(ev.target.value);

        resultsWrapper.innerHTML = '';
        dropdown.classList.remove('is-active');
       
        if (items.length === 0) {

            dropdown.classList.add('is-active');
            const option = document.createElement('a');
            option.classList.add('dropdown-item');
            
            option.innerHTML = `
            No search results
            `;
            
            resultsWrapper.appendChild(option);
        }

        if (items) {
            dropdown.classList.add('is-active');
            for (const item of items) {
                
                const option = document.createElement('a');
                option.classList.add('dropdown-item');
                
                option.innerHTML = renderOption(item); 

                option.addEventListener('click', () => {
                    dropdown.classList.remove('is-active');
                    input.value = inputValue(item);
                    onOptionSelect(item);
                });
                
                resultsWrapper.appendChild(option);
        
            }    
        }
    };

    input.addEventListener('input', debounce(onInput,500));

    //close the dropdown if clicked anywhere outside the root element of the dropdown
    // works by checking if the clicked event target is part of the root element
    document.addEventListener('click',(e) => {
        if(!root.contains(e.target)){
            dropdown.classList.remove('is-active');
        }
    });
};