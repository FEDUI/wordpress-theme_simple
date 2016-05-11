<?php
/*
Template Name: Example
*/
?>

<?php get_header(); ?>
	
	<!-- load template -->
	<?php Template::Render('snippets/snippet-example'); ?>

	<!-- Get page content -->
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

		<?php the_content(); ?>

	<?php endwhile; else : ?>
		<p><?php _e( 'Sorry, no posts matched your criteria.' ); ?></p>
	<?php endif; ?>

<?php get_footer(); ?>