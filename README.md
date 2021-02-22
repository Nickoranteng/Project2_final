TEAM MEMBERS

Regina Tettey
Vera Song
Jannette Amedome
Nicholas Koranteng
Sylvester Okeleke
Meakin Marange


Before you start writing any code, outline the scope and purpose of your project. This helps provide direction and prevent [scope creep](https://en.wikipedia.org/wiki/Scope_creep).

Write this as a brief summary of your interests and intent, including:

* The kind of data you'd like to work with/field you're interested in (e.g., geodata, weather data, etc.)

* The kinds of questions you'll be asking of that data

* The look and feel for the site as well as the user experience that you would like to create

* The data engineering work (API interactions, Web scraping, SQL processing, Python processing)

* The types of visualizations (tables, bars, scatter plots, maps, others) that you will use to communicate insights

* How should users iteract with the data (drop downs, text fields, other methods)

* Assigning one or more clear roles for your project team members. Suggested roles include:
    * Project manager
    * UX/UI and quality engineer
    * Data engineer
    * Data visualization analyst
    * GIS (web mapping) analyst
    * Machine learning engineer (for the final project)
    * Researcher

## Finding Data

Once your group has written an outline, it's time to start hunting for data. You are free to use data from any source, but we recommend the following curated sources of high-quality data:

* [data.world](https://data.world/)

* [Kaggle](https://www.kaggle.com/)

* [Data.gov](https://www.data.gov)

* [DC Open Data Portal](https://opendata.dc.gov/search?collection=Dataset)

* [Public APIs](https://github.com/abhishekbanthia/Public-APIs)

* [Awesome-APIs List](https://github.com/Kikobeats/awesome-api)

* [Medium APIs List](https://medium.com/@benjamin_libor/a-curated-collection-of-over-150-apis-to-build-great-products-fdcfa0f361bc)

Chances are you'll have to update your project plans as you explore the available data. **This is fine**—adjustments like this are part of the process! Just make sure everyone in the group is up-to-speed on the goals of the project as you make changes.

## The Task

With data in hand, it's time to tackle development and analysis. This is where the fun starts!

* Your task is to create an experience and tell a story with data visualizations.

* Focus on providing users an interactive means to explore data themselves. 

* Prepare a 20-minute presentation that lays out your theme, coding approach, data munging techniques, and final visualization.

* You may choose a project of any theme, but we encourage you to think broadly.

* You will have ample time in class to work with your group, but expect to put in hours outside of class as well. 

## Project Requirements

Create an interactive web site with dashboards (one or more pages) that either tells a story with data or provides a rich experience for allowing users to interact with data. Your project should meet the following requirements at minimum:

* Include a Python Flask–powered RESTful API, HTML/CSS, JavaScript, and at least one cloud database (MySQL or Postgres on AWS or MongoDB on MongoDB mLab or Atlas).

* Work with a data set that contains at least 500 records.

* Contain database and web site integration through Flask where data manipulations are done using Python and/or JavaScript prior to visualization.

* Use HTML, CSS, and Bootstrap with responsive design for all page components along with a functioning favicon.ico icon. Your project should render well on desktop and mobile devices.

* Utilize Plotly and/or Leaflet to create one or more web dashboards with interactive, dynamic, filterable web visualizations and/or maps and include at least three views of the data.

* Include some level of user-driven interaction (e.g., menus, dropdowns, textboxes).

* Be deployed to Heroku and should be fully functional on any machine at any location.

## Additional Project Requirements

* Include at least one JavaScript library that we did not cover
* Deploy a bot that does automated data operations and updates a cloud database (real time, multiple times per day, or nightly)
* Incorporate web scraping into your project
* Include both a Leaflet map in addition to Plotly visualizations
