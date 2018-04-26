/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

    /***************************************************************************
     * Set the default database connection for models in the development       *
     * environment (see config/connections.js and config/models.js )           *
     ***************************************************************************/

    // models: {
    //   connection: 'someMongodbServer'
    // }
    port: 1337,
    realHost: "http://wohlig.io:1337",
    accessLevels:[{
        name:"Super Admin",
        emails:['rahi.shah@sfanow.in']
    },{
        name:"Admin",
        emails:['pratik.wohlig@gmail.com',"chintan@wohlig.com", "raj@wohlig.com", "supriya.bhartiya@wohlig.com", "shiva.singh@sfanow.in", "sunil.rathod@sfanow.in", "venkatesh.rathod@sfanow.in", "neeraj.jaiswal@sfanow.in", "suksha.khodake@wohlig.com", "sagar.mulchandani@wohlig.com", "navin.narshetty@wohlig.com"]
    }]
};