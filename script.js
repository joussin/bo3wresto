
var troiswResto = {
	restos: null,
	reviews: null,
	app: null,

	init: function(app) {
		this.app = app
		
		this.bind()
	},

	bind: function() {
		var that = this
		$("body").on("click", ".change-review", function(event){
			event.preventDefault();
			var a = $( event.target ).parent() 
			var key = a.attr('data-key') 
			var restokey = a.attr('data-restokey') 
			var validate = a.attr('data-validate') 
			that.changeReview(restokey,key,validate)
		})

		$("body").on("click",".delete-review",function(event){
			event.preventDefault();
			if ( confirm("Etes vous sûr de vouloir supprimer cette review ?") ) {
				var a = $( event.target ).parent() 
				var key = a.attr('data-key2') 
				var restokey = a.attr('data-restokey2') 
				that.deleteReview(restokey,key)
			}
		})


		$("body").on("click", ".change-resto", function(event){
			event.preventDefault();
			var a = $( event.target ).parent() 
			var key = a.attr('data-key') 
			var validate = a.attr('data-validate') 
			that.changeResto(key,validate)
		})

		$("body").on("click",".delete-resto",function(event){
			event.preventDefault();
			if ( confirm("Etes vous sûr de vouloir supprimer ce resto ?") ) {
				var a = $( event.target ).parent() 
				var key = a.attr('data-key2') 
				that.deleteResto(key)
			}
		})


	},
	addRestos: function(dt) {
		var that = this
		
		dt.rows().remove().draw();

		for ( var resto of that.restos ) {

			var validateStr1 = ( resto.validate == 1 ) ? "green" : "red"

			var validateStr = ( resto.validate == 1 ) ? "on" : "off"

			var locationStr = ""
			locationStr += "lat: " + Math.ceil (resto.location.lat * 10000 )/10000
			locationStr += "\n"
			locationStr += "long: " + Math.ceil (resto.location.long * 10000 )/10000

	 	 	dt.row.add( [
	            resto.id,
	            resto.address,
	            resto.description,
	            locationStr,
	            resto.name,
	            resto.price,
	           	"<span style='display:none' >" + resto.validate + "</span><i class='fa fa-circle' style='color:"+validateStr1+"' ></i>",
				"off <a href='#' class='change-resto' data-key='"+resto.id+"' data-validate='"+resto.validate+"' ><i class='fa fa-toggle-"+ validateStr +"' ></i></a> on" + " " +
				"<a href='#'  class='delete-resto' data-key2='"+resto.id+"'  ><i class='fa fa-trash'  /></a>"
	        ] ).draw( false );
		}
	
	},
	addReviews: function(dt) {
		var that = this
		
		dt.rows().remove().draw();

		for ( var review of that.reviews ) {

			var resto = review.resto
			var key = review.key	
			var restokey = review.restokey
			var message = review.message
			var date = review.date
			var rating = review.rating
			var reviewerName = review.reviewerName
			var reviewerId = review.reviewerId
			var validate = review.validate


			var validateStr1 = ( review.validate == 1 ) ? "green" : "red"
			var validateStr = ( validate == 1 ) ? "on" : "off"
 
	 	 	dt.row.add( [
	            resto,
	            key,
	            date,
	            reviewerName,
	            message,
	            rating,
	           	"<span style='display:none' >" + review.validate + "</span><i class='fa fa-circle' style='color:"+validateStr1+"' ></i>",
				"off <a href='#' class='change-review' data-key='"+key+"' data-restokey='"+restokey+"' data-validate='"+validate+"' ><i class='fa fa-toggle-"+ validateStr +"' ></i></a> on" + " " +
				"<a href='#'  class='delete-review' data-key2='"+key+"' data-restokey2='"+restokey+"' ><i class='fa fa-trash'  /></a>"
	        ] ).draw( false );
		}
	

	},
	changeResto: function(key,validate){
		var ref = "data/resto/" + key + "/validate"
		if  ( parseInt(validate) == 0 ) {
			this.app.database().ref( ref ).set(1);
			$("*[data-key='"+key+"'] i ").removeClass('fa-toggle-off')
			$("*[data-key='"+key+"'] i ").addClass('fa-toggle-on')
			$("*[data-key='"+key+"']").attr('data-validate',1)
		} else {
			this.app.database().ref( ref ).set(0);
			$("*[data-key='"+key+"'] i ").removeClass('fa-toggle-on')
			$("*[data-key='"+key+"'] i ").addClass('fa-toggle-off')
			$("*[data-key='"+key+"']").attr('data-validate',0)
		}
	},

	deleteResto: function(key){
		var ref =  "data/resto/" + key 
		this.app.database().ref( ref ).remove();
		$("*[data-key='"+key+"']").parent().parent().remove()
	},

	changeReview: function(restokey,key,validate){
		var ref = "data/resto/" + restokey + "/reviews/" + key + "/validate"
		if  ( parseInt(validate) == 0 ) {
			this.app.database().ref( ref ).set(1);
			$("*[data-key='"+key+"'] i ").removeClass('fa-toggle-off')
			$("*[data-key='"+key+"'] i ").addClass('fa-toggle-on')
			$("*[data-key='"+key+"']").attr('data-validate',1)
		} else {
			this.app.database().ref( ref ).set(0);
			$("*[data-key='"+key+"'] i ").removeClass('fa-toggle-on')
			$("*[data-key='"+key+"'] i ").addClass('fa-toggle-off')
			$("*[data-key='"+key+"']").attr('data-validate',0)
		}
	},

	deleteReview: function(restokey,key){
		var ref =  "data/resto/" + restokey + "/reviews/" + key
		this.app.database().ref( ref ).remove();
		$("*[data-key='"+key+"']").parent().parent().remove()
	}
}


 
