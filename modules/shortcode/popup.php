<div id="pi-ifg-popup-wrapper" style="display:none;">
	<div class="container-fluid wiloke-gallery-wrapper" style="width: 100%; max-width:100%">
		<div class="row">

			<form action="" id="pi-ifg-form-flicrk" class="pi_flickr pi_only_one pi_form_setting" data-form="flickr">
				<div class="form-group">
					<label  class="form-label"><?php _e('Flickr Id: *', 'wiloke') ?></label>
					<input type="text" class="form-control pi_item pi_required" name="pi_user_id" value="">
					<a href="http://idgettr.com/" target="_blank"><?php _e('Get Flickr Id', 'wiloke'); ?></a>
				</div>

				<div class="form-group pi_tiled_gallery">
					<label  class="form-label"><?php _e('Photo Set', 'wiloke') ?></label>
					<input type="text" class="form-control pi_item" name="pi_photo_set" value="">
					<code class="help"><?php _e("Display only the specified photoID,Enter 'none' to display all photo stream, leave empty to display albumn", "wiloke") ?></code>
				</div>

				<div class="form-group">
					<input type="hidden" class="form-control pi_item" name="pi_type" value="flickr">
				</div>
			</form>

			<form action="" id="pi-ifg-form-custom" class="pi_custom pi_only_one pi_form_setting" data-form="custom">
				<div class="form-group pi-wrap-upload">
					<input type="text" class="form-control pi_item pi_required pi_insert_val" name="pi_image_ids" value="">
					<input type="hidden" data-url="true" class="form-control pi_item pi_insert_urls" name="pi_insert_urls" value="">
					<div class="pi-awesome-gallery clearfix">

					</div>
					<button class="button button-primary pi_awesome_gallery" data-multiple="true" data-insertto=".pi-awesome-gallery"><?php _e('Upload', 'wiloke') ?></button>
				</div>

				<div class="form-group">
					<input type="hidden" class="form-control pi_item" name="pi_type" value="custom">
				</div>
			</form>

			<form action="" id="pi-ifg-form-instagram" class="pi_instagram pi_only_one pi_form_setting" data-form="instagram">

				<div class="form-group">
					<label id="pi_instagram_get"  class="form-label"><?php _e('Get', 'wiloke') ?></label>
					<select name="pi_instagram_get" id="pi_instagram_get" class="pi_instagram_get form-control pi_item">
						<option value="popular"><?php _e("Images from popular page", "wiloke"); ?></option>
						<option value="tag"><?php _e("Images with the specific tag", "wiloke"); ?></option>
						<option value="users"><?php _e("Images with a user", "wiloke"); ?></option>
					</select>
				</div>

				<div class="form-group pi_instagram_setting pi_tag">
					<label  class="form-label"><?php _e('Tag Name - Name of the tag to get.', 'wiloke') ?></label>
					<input type="text" class="form-control pi_item" name="pi_instagram_tagname" value="">
				</div>

				<div class="form-group pi_instagram_setting pi_popular">
					<label  class="form-label"><?php _e('Client ID', 'wiloke') ?></label>
					<input type="text" class="form-control pi_item" name="pi_instagram_client_id" value="">
					<code class="help"><?php _e('Find Client ID at ', 'wiloke'); ?><a target="_blank" style="color:red" href="http://blog.wiloke.com/find-instagram-user-id-access-token/">http://darkwhispering.com/how-to/get-a-instagram-client_id-key</a></code>
				</div>

				<div class="form-group pi_instagram_setting pi_users">
					<label  class="form-label"><?php _e('User ID - Unique id of a user to get.', 'wiloke') ?></label>
					<input type="text" class="form-control pi_item" name="pi_instagram_user_id" value="">
					<code class="help"><a target="_blank" style="color:red" href="http://blog.wiloke.com/find-instagram-user-id-access-token/"><?php esc_html_e('Find My Instagram User ID', 'wiloke'); ?></a></code>
				</div>

				<div class="form-group pi_instagram_setting pi_users pi_tag">
					<label  class="form-label"><?php esc_html_e('Access Token - A valid oAuth token.', 'wiloke') ?></label>
					<input type="text" class="form-control pi_item" name="pi_instagram_access_token" value="">
					<code class="help"><a target="_blank" style="color:red" href="http://blog.wiloke.com/find-instagram-user-id-access-token/"><?php esc_html_e('Find my Instagram Access Token', 'wiloke');?></a>. Leave empty If you are using <a href="http://themeforest.net/user/wiloke/portfolio" target="_blank" style="color: red">Wiloke theme</a> and an Instagram access token supplied.</code>
				</div>
				<div class="form-group">
					<input type="hidden" class="form-control pi_item" name="pi_type" value="instagram">
				</div>
			</form>


            <div class="pi_style">
                <h3 class="pi_fig_click_toggle"><?php esc_html_e("Display as: ", "wiloke") ?></h3>
                <form action="" id="pi-ifg-form-style"  class="pi_style pi_form_setting">
                    <div class="form-group">
                        <select name="pi_style" id="pi_style" class="form-control pi_item">
                            <option value="tiled_gallery"><?php esc_html_e("Justified Gallery", "wiloke"); ?></option>
                            <option value="slideshow"><?php esc_html_e("Slideshow", "wiloke"); ?></option>
                        </select>
                    </div>
                </form>
            </div>

            <div class="pi_is_slideshow">
                <h3 class="pi_fig_click_toggle"><?php esc_html_e("General Settings", "wiloke") ?></h3>
                <form action="" id="pi-ifg-slideshow-general"  class="pi_slideshow_general pi_general pi_form_setting">
                    <div class="form-group">
                        <label  class="form-label"><?php esc_html_e('Limit', 'wiloke') ?></label>
                        <input name="pi_slideshow_limit" id="pi_slideshow_limit" type="text" class="form-control pi_item" value="20" />
                        <code class="help"><?php esc_html_e("This setting is available for Flickr and Instagram. Set how many items you want to loop through. Flickr seems to limit its feeds to 20, so that is default.", "wiloke") ?></code>
                    </div>
                    <div class="form-group">
                        <label  class="form-label"><?php esc_html_e('Maximum Of Width', 'wiloke') ?></label>
                        <input name="pi_maximun_width" id="pi_maximun_width" type="text" class="form-control pi_item">
                        <code class="help"><?php esc_html_e("Default 100%. You are able to use px or %.", "wiloke") ?></code>
                    </div>
                    <div class="form-group">
                        <label  class="form-label"><?php esc_html_e('Auto Play', 'wiloke') ?></label>
                        <input name="pi_slideshow_autoplay" id="pi_slideshow_autoplay" type="text" class="form-control pi_item">
                        <code class="help"><?php esc_html_e("Change to any integrer for example autoPlay : 5000 to play every 5 seconds. Leave blank to disable autoplay", "wiloke") ?></code>
                    </div>
                    <div class="form-group">
                        <label  class="form-label"><?php esc_html_e('Auto height', 'wiloke') ?></label>
                        <select name="pi_slideshow_auto_height" id="pi_slideshow_auto_height" class="form-control pi_item">
                            <option value="false"><?php esc_html_e("FALSE", "wiloke"); ?></option>
                            <option value="true"><?php esc_html_e("TRUE", "wiloke"); ?></option>
                        </select>
                        <code class="help"><?php esc_html_e("Display Only one item", "wiloke") ?></code>
                    </div>
                    <div class="form-group">
                        <label  class="form-label"><?php esc_html_e('Single Item', 'wiloke') ?></label>
                        <select name="pi_slideshow_single_item" id="pi_slideshow_single_item" class="form-control pi_item">
                            <option value="0"><?php esc_html_e("FALSE", "wiloke"); ?></option>
                            <option value="1"><?php esc_html_e("TRUE", "wiloke"); ?></option>
                        </select>
                        <code class="help"><?php esc_html_e("Display Only one item", "wiloke") ?></code>
                    </div>
                    <div class="form-group">
                        <label  class="form-label"><?php esc_html_e('Items', 'wiloke') ?></label>
                        <input name="pi_slideshow_items" id="pi_slideshow_items" class="form-control pi_item" value="5">
                        <code class="help"><?php esc_html_e("This variable allows you to set the maximum amount of items displayed at a time with the widest browser width", "wiloke"); ?></code>
                    </div>
                    <div class="form-group">
                        <label  class="form-label"><?php esc_html_e('Items Desktop', 'wiloke') ?></label>
                        <input name="pi_slideshow_items_desktop" id="pi_slideshow_items_desktop" class="form-control pi_item" value="5">
                    </div>
                    <div class="form-group">
                        <label  class="form-label"><?php esc_html_e('Items Tablet', 'wiloke') ?></label>
                        <input name="pi_slideshow_items_tablet" id="pi_slideshow_items_tablet" class="form-control pi_item" value="2">
                    </div>
                    <div class="form-group">
                        <label  class="form-label"><?php _e('Items Mobile', 'wiloke') ?></label>
                        <input name="pi_slideshow_items_mobile" type="text" id="pi_slideshow_items_mobile" class="form-control pi_item" value="2">
                    </div>
                </form>
            </div>

			<div class="pi_general_settings pi_tiled_gallery">
				<h3 class="pi_fig_click_toggle"><?php _e("General Settings", "wiloke") ?></h3>
				<form action="" id="pi-ifg-form-general"  class="pi_general pi_form_setting">
					<div class="form-group">
						<label  class="form-label"><?php _e('Limit', 'wiloke') ?></label>
						<input name="pi_tiled_gallery_limit" id="pi_tiled_gallery_limit" type="text" class="form-control pi_item" value="20" />
						<code class="help"><?php _e("This setting is available for Flickr and Instagram. Set how many items you want to loop through. Flickr seems to limit its feeds to 20, so that is default.", "wiloke") ?></code>
					</div>

					<div class="form-group">
						<label  class="form-label"><?php _e('Row Height', 'wiloke') ?></label>
						<input name="pi_rowheight" id="pi_rowheight" class="form-control pi_item" value="120"/>
						<code class="help">The preferred height of rows in pixel.</code>
					</div>

					<div class="form-group">
						<label  class="form-label"><?php _e('Max Row Height', 'wiloke') ?></label>
						<input name="pi_maxrowheight" id="pi_maxrowheight" class="form-control pi_item" value="200%"/>
						<code class="help">	A number (e.g 200) which specifies the maximum row height in pixel. A negative value to don't have limits. Alternatively, a string which specifies a percentage (e.g. 200% means that the row height can't exceed 2 * rowHeight).</code>
					</div>

					<div class="form-group">
						<label  class="form-label"><?php _e('Fixed Height', 'wiloke') ?></label>
						<select name="pi_fixedheight" id="pi_fixedheight" class="form-control pi_item">
							<option value="false">False</option>
							<option value="true">True</option>
						</select>
						<code class="help">Decide if you want to have a fixed height. This mean that all the rows will be exactly with the specified rowHeight.</code>
					</div>

					<div class="form-group">
						<label  class="form-label"><?php _e('Max Row Height', 'wiloke') ?></label>
						<select name="pi_lastrow" id="pi_lastrow" class="form-control pi_item">
							<option value="nojustify">No Justified</option>
							<option value="justify">Justified</option>
							<option value="hide">Hide</option>
						</select>
						<code class="help">Decide to justify the last row (using 'justify') or not (using 'nojustify'), or to hide the row if it can't be justified (using 'hide'). By default, using 'nojustify', the last row images are aligned to the left, but they can be also aligned to the center (using 'center') or to the right (using 'right').</code>
					</div>

					<div class="form-group">
						<label  class="form-label"><?php _e('Show caption', 'wiloke') ?></label>
						<select name="pi_showcaption" id="pi_showcaption" class="form-control pi_item">
							<option value="true">True</option>
							<option value="false">False</option>
						</select>
						<code class="help">Decide if you want to show the caption or not, that appears when your mouse is over the image.</code>
					</div>

					<div class="form-group">
						<label  class="form-label"><?php esc_html_e('Random Size', 'wiloke') ?></label>
						<select name="pi_randomize" id="pi_randomize" class="form-control pi_item">
							<option value="false"><?php esc_html_e('False', 'wiloke'); ?></option>
							<option value="true"><?php esc_html_e('True', 'wiloke'); ?></option>
						</select>
						<code class="help"><?php esc_html_e('Automatically randomize or not the order of photos.', 'wiloke'); ?></code>
					</div>

					<div class="form-group">
						<label  class="form-label"><?php esc_html_e('Margin', 'wiloke') ?></label>
						<input name="pi_margin" id="pi_margin" class="form-control pi_item" value="0" />
						<code class="help"><?php esc_html_e('Decide the margins between the images', 'wiloke'); ?></code>
					</div>

				</form>
			</div>

			<div class="form-group">
				<button id="pi-ifg-save" class="button button-primary pi-popup-save"><?php esc_html_e('Save', 'wiloke') ?></button>
				<button id="pi-ifg-cancel" class="button button-primary pi-popup-cancel"><?php esc_html_e('Cancel', 'wiloke') ?></button>
			</div>
		</div>
	</div>
</div>
