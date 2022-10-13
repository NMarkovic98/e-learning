<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('course_media_questions', function (Blueprint $table) {
            $table->id('cmq_id');
            $table->unsignedBigInteger('cm_id');
            $table->foreign('cm_id')->references('cm_id')->on('course_media')->onDelete('cascade');
            $table->string('question')->length(255);
            $table->string('answer')->length(45);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('course_media_questions');
    }
};
