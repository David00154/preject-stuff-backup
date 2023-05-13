<script>
	import Nprogress from 'nprogress';
	import { navigating, page } from '$app/stores';

	import '../app.postcss';
	import 'nprogress/nprogress.css';

	Nprogress.configure({
		minimum: 0.16
	});

	$: {
		if ($navigating) {
			Nprogress.start();
		}
		if (!$navigating || $page.form) {
			Nprogress.done();
		}
	}
</script>

<slot />
