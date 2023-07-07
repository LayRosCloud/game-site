class HateoasService{
    getAll(){
        const list = [
            {
                rel: 'hrefs',
                href: `${process.env.URL_START_POINT}/`,
            }
        ]
        add(process.env.URL_BLOGS);
        add(process.env.URL_GAMES);
        add(process.env.URL_COMMENTS);
        add(process.env.URL_GAMES_GENRE);
        add(process.env.URL_CONTENT_GAMES);
        add(process.env.URL_GENRES);
        add(process.env.URL_PREVIEWS);
        add(process.env.URL_LINKS);
        add(process.env.URL_REVIEWS);
        add(process.env.URL_TYPE_BLOGS);
        add(process.env.URL_TYPE_SERVICES);
        add(process.env.URL_TYPE_RELEASES);
        add(process.env.URL_TYPE_CONTENTS);
        add(process.env.URL_USERS);
        add(`${process.env.URL_USERS}/${process.env.URL_USERS_LOGIN}`);
        add(`${process.env.URL_USERS}/${process.env.URL_USERS_REFRESH}`);
        add(process.env.URL_ROLES);

        function add(name, version = process.env.URL_VERSION){
            list.push(
                {
                    rel: name.replace('/', '-'),
                    href: `${process.env.URL_START_POINT}${version}${name}/`,
                }
            );
        }
        return list;
    }
}

module.exports = new HateoasService()