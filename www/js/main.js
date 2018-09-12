const categories = $.getJSON("../categories.json",
    function (data) {
        const categoryList = Object.keys(data).map(category => {
            //Create sub category list
            const subCategories = data[category].map(subCategory => {
                return `
                    <li class="nav-item">
                        <a class="nav-link active btn-category" href="#">${subCategory}</a>
                    </li>`;
            }).join('');

            //Create category list
            const listItem = `
            <li class="nav-item">
                <a class="btn dropdown-toggle btn-category" data-toggle="collapse" href="#${category}" aria-expanded="false" aria-controls="${category}">${category}</a>
            </li>
            <div class="row mt-1">
              <div class="col">
                <div class="collapse multi-collapse" id="${category}">
                  <div class="card card-body border-0 sub-categories-card">
                    <ul class="nav flex-column sub-categories">
                        ${subCategories}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            `
            return listItem;
        });

        //Writes all the list
        $('.side-menu').html(categoryList)
    }
);
