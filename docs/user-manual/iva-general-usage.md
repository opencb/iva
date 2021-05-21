# General Usage

{% hint style="info" %}
_**NOTE**_: _You can access our public IVA installation at the University of Cambridge at_ [_http://bioinfo.hpc.cam.ac.uk/web-apps/iva-prod/\#home_](http://bioinfo.hpc.cam.ac.uk/web-apps/iva-prod/#home)_._ The current version of IVA for the installation is_**`V2.0.0-RD`**_
{% endhint %}

## Login​

Navigate to the IVA main page. For example, if you want to access the University installation, go this [link](http://bioinfo.hpc.cam.ac.uk/web-apps/iva-prod/#home) , find the **Login tab** in the top right of the screen and introduce the credentials: user: _demouser_, password: _demouser._

![IVA&apos;s Login page](../.gitbook/assets/image%20%282%29.png)

If the credentials provided are correct, a "Welcome Message" will be displayed and the application will start to fetch the studies populated into the correspondent OpenCGA installation you are accessing to.

![](../.gitbook/assets/image%20%285%29.png)

##  Project and Studies

### **Project and Study organisation**

The project/study organisation is  key in order to optimise data usability in OpenCGA, and thus in IVA.

Projects provide physical separation of data into different database tables.  
Studies provide logical separation of data within a Project. For an efficient project/study organisation, see next recommendations: 

* Data from different genome assemblies should keep in different projects \(e.g you should create a project for data from GRCh37 and other for data from GRCh38\)
* It is appropriate to store  data in different projects when there is no foreseeable need to process them jointly.
* It is recommended to split your data in studies corresponding to different independent datasets that may be used together in some analysis, with the aim of having homogeneous datasets for each study.

![](../.gitbook/assets/image%20%286%29.png)

## Explore the different components of IVA

