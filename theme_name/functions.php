<?php
/* 
	Code origional writen by Occhio --> www.occhio.nl

	Useage: 
*/
	class Template {

	    function Render($file, $args = array()){
	        $template = new Tools_ThemeView($file . '.php', $args);
	        $template->render();
	    }

	}

	if ( ! class_exists('Tools_ThemeView') ) {
		class Tools_ThemeView {
			private $args;
			private $file;
	 
			public function __get($name) {
				return $this->args[$name];
			}
	 
			public function __construct($file, $args = array()) {
				$this->file = $file;
				$this->args = $args;
			}
	 
			public function __isset($name){
				return isset( $this->args[$name] );
			}
	 
			public function render() {
				if( locate_template($this->file) ){
					include( locate_template($this->file) );//Theme Check free. Child themes support.
				} else {				
					$this->file = 'templates/' . $this->file;
					if( locate_template($this->file) ){
						include( locate_template($this->file) );//Theme Check free. Child themes support.
					}
				}
			}
		}
	}
?>